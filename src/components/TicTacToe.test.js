import TicTacToe from './TicTacToe';
import { describe, it, expect } from 'vitest';


describe("vite tests", () => {

  it("Test O Property", async () => {

    console.log("Testing O player const");
    expect(TicTacToe.O).toBe("O");


  });

});
