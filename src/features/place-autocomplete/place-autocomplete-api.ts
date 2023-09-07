export type PlaceSuggestion = google.maps.places.QueryAutocompletePrediction;

export function findSuggestions(query: string) {
  return new Promise<{ data: PlaceSuggestion[] }>((resolve, reject) => {
    const service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: query }, (predictions, status) => {
      switch (status) {
        case 'OK':
        case 'ZERO_RESULTS':
          resolve({ data: predictions || [] });
          break;
        default:
          console.error(`Fetch predictions status: ${status}`);
          reject('PREDICTIONS_NOT_FOUND');
          break;
      }
    });
  });
}
