import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import {  Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


import express, {Request, Response} from 'express';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter{
    catch(exception: Prisma.PrismaClientKnownRequestError| Prisma.PrismaClientValidationError, host: ArgumentsHost) {

        
        const errorMessage = 'Request Cannot be processed due to a prisma error!'
        const statusCode = 400
        const errorResponse = {message:errorMessage,statusCode}
        
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();

        response.status(statusCode).json({errorResponse})

    }
    
}