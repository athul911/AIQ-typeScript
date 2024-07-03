// test/validationMiddleware.test.ts

import { validatePlantQuery, uploadExcelMiddleware } from '../../src/middlewares/validationMiddleware';
import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import { expect } from 'chai';



describe('Validation Middleware', () => {
    describe('validatePlantQuery', () => {
        it('should pass validation with correct query parameters', () => {
            const req = {
                query: {
                    state: 'CA',
                    topN: '5'
                }
            } as any;
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            } as any;
            const next = sinon.spy() as any;

            validatePlantQuery[validatePlantQuery.length - 1](req, res, next);

            expect(next.calledOnce).to.be.true;
            expect(res.status.called).to.be.false;
            expect(res.json.called).to.be.false;
        });

        it('should fail validation with incorrect query parameters', async () => {
            const req = {
                query: {
                    state: '123',
                    topN: '-1'
                }
            } as any;
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            } as any;
            const next = sinon.spy() as any;
        
            for (const middleware of validatePlantQuery) {
                await middleware(req, res, next);
            }
        
            expect(res.status.calledWith(400) as Response).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        });
    });

    describe('uploadExcelMiddleware', () => {
        // Test cases for multer upload middleware can be added here if needed
    });
});
