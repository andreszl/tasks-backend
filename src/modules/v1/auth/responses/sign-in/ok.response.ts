import { getSchemaPath } from '@nestjs/swagger';
import JwtTokensDto from '../../dto/jwt-tokens.dto';

export default {
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(JwtTokensDto),
        },
      },
    },
    description: 'Returns jwt tokens',
  }