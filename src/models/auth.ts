export interface Token{
    accessToken: { token: string | null; expiresAt: number | null } | null;
}