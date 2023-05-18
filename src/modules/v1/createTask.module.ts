import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import Create from './task/create.module';


const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/task', module: Create },

    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    Create
  ],
})
export default class CreateTask {}
