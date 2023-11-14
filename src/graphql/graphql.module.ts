/* eslint-disable prettier/prettier */
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { UserModule } from "./user/user.module";

@Module({
    imports:[
        UserModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,   
            autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        })
    ],
})
export class GraphQLConfigModule {}
