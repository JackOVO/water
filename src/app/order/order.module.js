/**
 * 订单模块
 */

import { OrderFactory } from './order.factory';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

angular
  .module('water.order', [])
  .service('orderFactory', OrderFactory)
  .service('orderService', OrderService)
  .controller('OrderController', OrderController);