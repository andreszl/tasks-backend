import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import AuthModule from './auth/auth.module';
import TaskModule from './task/task.module';


const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/task', module: TaskModule },

    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    TaskModule
  ],
})
export default class V1Module {}
