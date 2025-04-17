import { COOKIE_NAME, JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
import pool from "./sql/connection.js";
import { parse } from "cookie";
import { serverError } from "./responses.js";

export function tokenValidate(req, res, next){
    try{
        const { authorization } = req.headers;
        let token = '';
        if(!authorization){
            const cookies = parse(req.headers.cookie || '');
            token = cookies[COOKIE_NAME];
        }else{
            token = authorization.replace('Bearer ', '');
        }
        if(!token){
            res.status(203).json({
                error: 'Token not found'
            });
            return;
        }

        const user = jwt.verify(token, JWT_SECRET);
        if(!user){
            res.status(203).json({
                error: 'Invalid token'
            });
            return;
        }
        req.user = user;
        next();
    }catch(e){
        serverError(res, e);
    }
}

export function companyVerify(admin = false){
    return async (req, res, next) => {
        try{
            const { id } = req.usuario;
            const { company } = req.params;
            if(!company){
                return res.status(400).json({
                    error: 'Bad request'
                });
            }
            const query = `
                SELECT COUNT(*) FROM tblUserByCompany WHERE id_user = $1 AND id_company = $2 ${
                    admin ? 'AND is_admin = true' : ''
                }
            `;
            const { rows } = await pool.query(query, [id, company]);
            if (rows[0].count > 0) {
                return next();
            }
            return res.status(403).json({ 
                error: "Forbidden"
            });
        }catch(e){
            serverError(res, e);
        }
    }
}