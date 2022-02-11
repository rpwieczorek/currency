import { render,screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox amount={150} to="PLN" from="USD" />);
  });

  const testCasesPLNUSD = [
    { amount: 100, result: '28.57'},
    { amount: 20 , result: '5.71'},
    { amount: 200 , result: '57.14'},
    { amount: 345, result: '98.57'},
  ];
  for(const testObj of testCasesPLNUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox amount={testObj.amount} to="USD" from="PLN" />);
      const output = screen.getByTestId('output');
      const outputString = 'PLN ' + testObj.amount + '.00 = $'+ testObj.result;
      expect(output).toHaveTextContent(outputString);
    });
  }

  const testCasesUSDPLN = [
    { amount: 100, result: '350.00'},
    { amount: 20 , result: '70.00'},
    { amount: 200 , result: '700.00'},
    { amount: 345, result: '1,207.50'},
  ];
  for(const testObj of testCasesUSDPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox amount={testObj.amount} to="PLN" from="USD" />);
      const output = screen.getByTestId('output');
      const outputString = '$' + testObj.amount + '.00 = PLN '+ testObj.result;
      expect(output).toHaveTextContent(outputString);
    });
  }

  it('should render proper info about conversion when USD -> USD', () => {
    render(<ResultBox amount={150} to="USD" from="USD" />);
    const output = screen.getByTestId('output');
    const outputString = '$150.00 = $150.00';
    expect(output).toHaveTextContent(outputString);
  });
  
  it('should render proper info about conversion when PLN -> PLN', () => {
    render(<ResultBox amount={150} to="PLN" from="PLN" />);
    const output = screen.getByTestId('output');
    const outputString = 'PLN 150.00 = PLN 150.00';
    expect(output).toHaveTextContent(outputString);
  });

  it('should render error when amout is below 0', () => {
    render(<ResultBox amount={-150} to="USD" from="PLN" />);
    const output = screen.getByTestId('output');
    const outputString = 'Wrong value...';
    expect(output).toHaveTextContent(outputString);
  });

});