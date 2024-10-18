import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

jest.mock('axios');

const data = {
  id: 1,
  name: 'Ivan',
};

const url = '/users/some-id';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(url);
    expect(axios.create).toHaveBeenCalled();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(url);
    expect(axios.create().get).toHaveBeenCalled();
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(url);
    expect(result).toEqual(data);
  });
});
