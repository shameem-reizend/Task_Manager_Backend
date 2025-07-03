import * as yup from 'yup';

export const validation = (schema: yup.AnySchema) => async (req: any, res: any, next: any) => {
    
    const body = req.body;
    try {
        await schema.validate(body, {
            abortEarly: false, 
        });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                status: 'error',
                message: error.errors,
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}