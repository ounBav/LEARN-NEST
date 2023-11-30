/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities';
import { Repository } from 'typeorm';
import * as A from './role.arg';


@Injectable()
export class RoleService {

    constructor(@InjectRepository(RoleEntity) readonly userRepo: Repository<RoleEntity>){}
    /*************************
     * QUERY
     *************************/
    async getRoles(@Args() args: A.RoleArgs){
        
    }
    /*************************
     * MUTATION
     *************************/
}
