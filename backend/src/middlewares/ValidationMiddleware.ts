import { type Request, type Response, type NextFunction } from 'express';


export const validate = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (parsedData.body) req.body = parsedData.body;
            
            // req.query e req.params possuem getters estritos no Express 5
            // Então atualizamos as propriedades sem sobrescrever o objeto
            if (parsedData.query) {
                Object.assign(req.query, parsedData.query);
            }
            if (parsedData.params) {
                Object.assign(req.params, parsedData.params);
            }

            next();
        } catch (erro) {
            next(erro); // Passa para o ErrorHandler
        }
    };
};
