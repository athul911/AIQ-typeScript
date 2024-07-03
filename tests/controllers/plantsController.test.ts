import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { getPlants, uploadPlants } from '../../src/controllers/plantsController';
import * as plantsService from '../../src/services/plantsService';

describe('Plants Controller', () => {
    describe('getPlants', () => {
        it('should return plants data', async () => {
            const req = {
                query: {
                    state: 'CA',
                    topN: '5',
                    fileID: 'testFileID'
                }
            } as any;
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            } as any;

            const plants:any = [{ plantName: 'Plant1' }, { plantName: 'Plant2' }];
            const getPlantsDataStub = sinon.stub(plantsService, 'getPlantsData').resolves(plants);

            await getPlants(req, res);

            expect(getPlantsDataStub.calledOnce).to.be.true;
            expect(res.json.calledWith({ "total_length": plants.length, "plants": plants })).to.be.true;

            getPlantsDataStub.restore();
        });

        it('should return 404 if no plants found', async () => {
            const req = {
                query: {
                    state: 'CA',
                    topN: '5',
                    fileID: 'testFileID'
                }
            } as any;
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            } as any;

            const getPlantsDataStub = sinon.stub(plantsService, 'getPlantsData').resolves([]);

            await getPlants(req, res);

            expect(getPlantsDataStub.calledOnce).to.be.true;
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ error: 'No plants found for the given input' })).to.be.true;

            getPlantsDataStub.restore();
        });

        it('should handle errors', async () => {
            const req = {
                query: {
                    state: 'CA',
                    topN: '5',
                    fileID: 'testFileID'
                }
            } as any;
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            } as any;

            const getPlantsDataStub = sinon.stub(plantsService, 'getPlantsData').throws(new Error('Test error'));

            await getPlants(req, res);

            expect(getPlantsDataStub.calledOnce).to.be.true;
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: 'An error occurred while fetching plants data' })).to.be.true;

            getPlantsDataStub.restore();
        });
    });

    describe('uploadPlants', () => {
        it('should handle file upload and return fileID', async () => {
            const req = {
                file: {
                    path: 'testPath'
                }
            } as any;
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            } as any;

            const savePlantsDataStub = sinon.stub(plantsService, 'savePlantsData').resolves('testFileID');

            await uploadPlants(req, res);

            expect(savePlantsDataStub.calledOnceWith('testPath')).to.be.true;
            res.status
            expect(res.json.calledWith({ fileID: 'testFileID', message: 'Plant and state data uploaded successfully' })).to.be.true;

            savePlantsDataStub.restore();
        });

        it('should return 400 if no file uploaded', async () => {
            const req = {
                file: undefined
            } as any;
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            } as any;

            await uploadPlants(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ error: 'No file uploaded' })).to.be.true;
        });

        it('should handle errors', async () => {
            const req = {
                file: {
                    path: 'testPath'
                }
            } as any;
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            } as any;

            const savePlantsDataStub = sinon.stub(plantsService, 'savePlantsData').throws(new Error('Test error'));

            await uploadPlants(req, res);

            expect(savePlantsDataStub.calledOnceWith('testPath')).to.be.true;
            expect(res.status.calledWith(500)).to.be.true;

            savePlantsDataStub.restore();
        });
    });
});
