import { Pagination } from "antd";

function PagePagination({ defaultPage, onChangeHandler, dataLength }) {
  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  return (
    <div>
      <Pagination
        defaultCurrent={defaultPage}
        total={dataLength}
        itemRender={itemRender}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default PagePagination;
