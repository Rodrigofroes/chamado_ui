import * as jose from 'jose'
import { UsuarioEntidade } from '../types/entidades/usuarioEntidade';

export default async function decodeJWT(token: string): Promise<UsuarioEntidade | null> {
    try {
        const payload: UsuarioEntidade = jose.decodeJwt(token);
        return payload;
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null
    }
}