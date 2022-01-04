import { Pagination } from "antd";

function PagePagination({ defaultPage, onChangeHandler, dataLength }) {
  return (
    <div>
      <Pagination
        current={defaultPage}
        total={dataLength}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={onChangeHandler}
        showSizeChanger={false}
      />
    </div>
  );
}

export default PagePagination;
