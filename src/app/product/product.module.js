/**
 * 商品模块
 */

import { ProductFactory } from './product.factory';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

angular
  .module('water.product', [])
  .service('productFactory', ProductFactory)
  .service('productService', ProductService)
  .controller('ProductController', ProductController);