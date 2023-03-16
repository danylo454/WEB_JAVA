package shop.interfaces;

import shop.dto.ServiceResponseDto;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductEditDTO;
import shop.dto.product.ProductItemDTO;

public interface ProductService {
 ServiceResponseDto create(ProductCreateDTO model);
 ServiceResponseDto getProductsCategory(int idCategory);
 ServiceResponseDto edit(int id, ProductEditDTO model);
 ServiceResponseDto getById(int id);
 ServiceResponseDto delete(int id);
}
