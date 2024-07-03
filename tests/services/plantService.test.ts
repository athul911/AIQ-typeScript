// test/plantsService.test.ts
import { expect } from 'chai';
import sinon from 'sinon';
import * as plantService from '../../src/services/plantsService';
import Plant from '../../src/models/plants';
import State from '../../src/models/states';
import * as excelUtils from '../../src/utils/excelUtils';

describe('Plants Service', () => {
    describe('getPlantsData', () => {
        it('should return plants data', async () => {
            const findStub = sinon.stub(Plant, 'find').returns({
                sort: sinon.stub().returnsThis(),
                limit: sinon.stub().returnsThis(),
                exec: sinon.stub().resolves([{ plantName: 'Plant1' }, { plantName: 'Plant2' }])
            } as any);

            const plants = await plantService.getPlantsData(5, 'testFileID', 'CA');

            expect(findStub.calledOnce).to.be.true;
            expect(plants.length).to.equal(2);

            findStub.restore();
        });
    });

    describe('savePlantsData', () => {
        it('should save plants and states data from excel file', async () => {
            const loadExcelDataStub = sinon.stub(excelUtils, 'loadExcelData').resolves({
                plantJson: [{ 'Plant name': 'Plant1', 'Plant annual net generation (MWh)': '100', 'Plant state abbreviation': 'CA' }],
                stateJson: [{ 'State abbreviation': 'CA', 'State annual net generation (MWh)': '1000' }]
            });

            const insertManyStub = sinon.stub(Plant, 'insertMany').resolves();
            const insertManyStateStub = sinon.stub(State, 'insertMany').resolves();

            //console.log('Current working directory:', process.cwd());

            const fileID = await plantService.savePlantsData('data/eGRID2021_data.xlsx',false);

            expect(loadExcelDataStub.calledOnce).to.be.true;
            expect(insertManyStub.calledOnce).to.be.true;
            expect(insertManyStateStub.calledOnce).to.be.true;


            loadExcelDataStub.restore();
            insertManyStub.restore();
            insertManyStateStub.restore();

        });
    });
});
