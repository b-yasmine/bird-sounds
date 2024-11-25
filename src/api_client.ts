class ApiClient {
  private baseUrl = 'https://xeno-canto.org/api/2/recordings';

  async getBirdSounds(page: number = 1): Promise<RecordingsResponse> {
    const response = await fetch(`${this.baseUrl}?query=gen:Grus&page=${page}`);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
    }
    return response.json();
  }
}

interface RecordingsResponse {
  numRecordings: string,
  page: number,
  numPages: number,
  recordings: Recording[],
}

export interface Recording {
  id: string,
  gen: string,
  sp: string,
  length: string,
  file: string,
}

export default new ApiClient();
