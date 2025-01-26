declare namespace Api {
  namespace GoodsManage {
    /** product base info */
    type ProductBase = {
      /** product name */
      productName: string;
      /** product code */
      productCode: string;
      /** product price */
      price: number;
      /** product stock */
      stock: number;
      /** product status */
      status: Common.EnableStatus;
    };

    /** product */
    type Product = Common.CommonRecord<ProductBase>;

    /** product edit model */
    type ProductEdit = Partial<Common.CommonRecord> & ProductBase;

    /** product search params */
    type ProductSearchParams = CommonType.RecordNullable<Pick<Product, 'productName' | 'productCode' | 'status'> & Common.CommonSearchParams>;

    /** product list */
    type ProductList = Common.PaginatingQueryRecord<Product>;
  }
}
