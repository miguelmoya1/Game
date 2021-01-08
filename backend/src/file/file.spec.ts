import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { FileController } from './file.controller';

describe('File', () => {
  let service: FileService;
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
      controllers: [FileController],
    }).compile();

    service = module.get<FileService>(FileService);
    controller = module.get<FileController>(FileController);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
