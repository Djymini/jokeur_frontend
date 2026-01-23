describe('Hello world', () => {
  let text: string;

  beforeEach(() => {
    text = "Hello World !"
  });

  it('should be Hello world', () => {
    expect(text).toBe("Hello World !");
  });

  it('should be Bonjour', () => {
    text = "Bonjour"

    expect(text).toBe("Bonjour");
  });
});
