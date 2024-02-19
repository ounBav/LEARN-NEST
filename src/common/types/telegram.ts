import { GraphQLScalarType, Kind } from 'graphql';

function validate(telegramUserEntity: unknown): string | never {
  if (
    typeof telegramUserEntity !== 'string' ||
    typeof typeof telegramUserEntity !== 'number'
  ) {
    throw new Error('invalid uuid');
  }
  return telegramUserEntity;
}

export const TLUserEntityScalar = new GraphQLScalarType({
  name: 'TLUserEntity',
  description: 'Telegram user entity',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return validate(ast.value);
    }
    throw new Error(`Unsupported kind: ${ast.kind}`);
  },
});
