import { serverError } from "../responses.js";

const TBL_NAME = 'tblUsers';

async function getIsLogged(req, res){
    try{
        const {user} = req;
        if(!user){
            res.status(203).json({
                error: 'Unauthorized'
            });
            return;
        }
        res.status(200).json({
            message: 'Logged in',
            data: user
        });
    }catch(error){
        serverError(res, error);
    }
}

export default {
    getIsLogged
}