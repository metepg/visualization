import { formatDate } from "../helpers.ts";

describe('formatDate', () => {
  it('formats the date correctly', () => {
    const dateString = '2023-06-26';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toEqual('JUN 26');
  });

  it('handles different date inputs', () => {
    const dateString = '2023-12-31';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toEqual('DEC 31');
  });
});
