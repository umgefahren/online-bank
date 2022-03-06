import type { User } from "@prisma/client";
import type { KeyLike } from "jose";

import * as jose from "jose";
import { GetUser } from "./database";

let privateKey: KeyLike = null;
let publicKey: KeyLike = null;

async function getPrivateKey(): Promise<KeyLike> {
    if (privateKey === null) {
        const keyPair = await jose.generateKeyPair("PS256");
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;
    }
    return privateKey;
}

async function getPublicKey(): Promise<KeyLike> {
    if (privateKey === null) {
        const keyPair = await jose.generateKeyPair("PS256");
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;
    }
    return privateKey;
}

export function ClientUserFromUser(user: User): ClientUser {
    return new ClientUser(user.userId, user.firstName, user.lastName);
}

export function ClientUserFromJwtPayload(payload: jose.JWTPayload): ClientUser {
    const userId = payload['userId'] as number;
    const firstName = payload['firstName'] as string;
    const lastName = payload['lastName'] as string;
    return new ClientUser(userId, firstName, lastName);
}

export class ClientUser {
    public userId: number;
    public firstName: string;
    public lastName: string;

    constructor(userId: number, firstName: string, lastName: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    jwtPayload(): jose.JWTPayload {
        return {
            'userId': this.userId,
            'firstName': this.firstName,
            'lastName': this.lastName,
        }
    }

    async toUser(): Promise<User> {
        return await GetUser(this.userId);
    }
}

export async function newJWT(user: ClientUser): Promise<string> {
    const encryptedUser = user.jwtPayload();
    console.log("Encrypted User => ", encryptedUser);
    const secretKey = await getPrivateKey();
    console.log("Secret Key => ", secretKey);

    try {

        const jwt = await new jose.SignJWT(encryptedUser)
            .setProtectedHeader({ alg: 'PS256' })
            .setIssuedAt()
            .setIssuer('urn:main:server')
            .setAudience('urn:main:client')
            .setExpirationTime('2h')
            .sign(secretKey);
        return jwt;
    } catch (error) {
        console.log("error => ", error);
    }
}

export async function verifyJWT(token: string): Promise<ClientUser> {
    const publicKey = await getPublicKey();

    const { payload } = await jose.jwtVerify(token, publicKey, {
        issuer: 'urn:main:server',
        audience: 'urn:main:client',
    });
    const clientUser = ClientUserFromJwtPayload(payload)
    return clientUser;
}