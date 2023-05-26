import Pagination from 'react-bootstrap/Pagination';
import React from 'react';



const PaginationCompo = (props) => {

    const handlePageChange = props.handlePageChange;
    let currentPage = props.currentPage;
    let totalPages = props.totalPages;


    return (
        <div className='m-3'>
            <Pagination className="pagination-container">
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                    onClick={() =>
                        handlePageChange(currentPage - 1 >= 1 ? currentPage - 1 : 1)
                    }
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() =>
                        handlePageChange(
                            currentPage + 1 <= totalPages ? currentPage + 1 : totalPages
                        )
                    }
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        </div>
    )
}

export default PaginationCompo;