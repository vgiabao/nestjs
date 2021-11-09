import {Test} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';


it('create instance of auth service testing', async () => {
  const module = await Test.createTestingModule({
    providers: [AuthService]
  }).compile()
  const service = module.get(AuthService)
  expect(service).toBeDefined()
})