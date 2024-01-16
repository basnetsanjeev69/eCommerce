import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout';
import NewCategory from '../../components/category/NewCategory';
import CategoryTable from '../../components/category/CategoryTable';

function Category() {
    return (
        <AdminLayout title="Category">
            {/* New Category Form */}
            <NewCategory />
            {/* Category Table */}
            <CategoryTable />
        </AdminLayout>
    )
}

export default Category;
