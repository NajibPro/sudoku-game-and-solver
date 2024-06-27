import Cell from '../src/app/models/cell';
import { describe, it, expect } from 'vitest';

describe('Cell class', () => {
  it('should create a Cell with the provided digit', () => {
    const cell = new Cell(5);
    expect(cell.digit).toBe(5);
  });

  it('should set digit to null if value is null', () => {
    const cell = new Cell(3);
    cell.digit = null;
    expect(cell.digit).toBeNull();
  });

  it('should set digit to null if value is not between 1 and 9', () => {
    const cell = new Cell(2);
    cell.digit = 10;
    expect(cell.digit).toBeNull();

    cell.digit = -1;
    expect(cell.digit).toBeNull();
  });

  it('should update digit to a valid number if value is between 1 and 9', () => {
    const cell = new Cell(null);
    cell.digit = 7;
    expect(cell.digit).toBe(7);
  });

  it('should update digit to null if value is not between 1 and 9', () => {
    const cell = new Cell(null);
    cell.digit = 50;
    expect(cell.digit).toBe(null);
  });
});



