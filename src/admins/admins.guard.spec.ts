import { AdminsGuard } from './admins.guard';

describe('AdminsGuard', () => {
  it('should be defined', () => {
    expect(new AdminsGuard()).toBeDefined();
  });
});
