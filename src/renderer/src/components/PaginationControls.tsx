import { Pagination } from 'flowbite-react'

interface PaginationControlsProps {
  currentPage: number
  totalRecords: number
  onPageChange: (page: number) => void
}

function PaginationControls({ currentPage, totalRecords, onPageChange }: PaginationControlsProps) {
  const totalPages = Math.ceil(totalRecords / 15)

  return (
    <div className="flex overflow-x-auto sm:justify-center py-6">
      {totalRecords > 0 ? (
        <div className="flex justify-between items-center w-full">
          <p className="text-sm text-gray-500">Total de {totalRecords} registros</p>
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div>
      ) : (
        <p className="text-gray-500">Não há dados cadastrados</p>
      )}
    </div>
  )
}

export default PaginationControls
