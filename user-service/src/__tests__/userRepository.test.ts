import { UserRepository } from "../repository/userRepository";

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  it("should create a new user", async () => {
    const user = await userRepository.create({
      name: "test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("email", "test@example.com");
  });
  it('should find a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com');
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@example.com');
  });
});
