import { HiEye, HiInformationCircle } from 'react-icons/hi'
import { Alert } from 'flowbite-react'
import { IAppError } from '@backend/interface/IAppError'

// Interface para as props do componente AlertError
interface IAlertError {
  appError: IAppError | null // Objeto de erro da aplicação
  onClose: any // Função para fechar o alerta
}

function AlertError({ appError, onClose }: IAlertError) {
  // Função para exibir detalhes completos do erro em um alerta de navegador
  function showAlert() {
    let alertMessage = `Message: ${appError?.message}`

    if (appError?.code) {
      alertMessage += `\nCode: ${appError?.code}`
    }

    if (appError?.details) {
      alertMessage += `\n\nSQLite Error Details:`
      alertMessage += `\nName: ${appError?.details.name}`
      alertMessage += `\nParent Message: ${appError?.details.parent.message}`
      alertMessage += `\nParent Errno: ${appError?.details.parent.errno}`
      alertMessage += `\nParent Code: ${appError?.details.parent.code}`
      alertMessage += `\nParent SQL: ${appError?.details.parent.sql}`
      alertMessage += `\nOriginal Message: ${appError?.details.original.message}`
      alertMessage += `\nOriginal Errno: ${appError?.details.original.errno}`
      alertMessage += `\nOriginal Code: ${appError?.details.original.code}`
      alertMessage += `\nOriginal SQL: ${appError?.details.original.sql}`
      alertMessage += `\nSQL: ${appError?.details.sql}`

      if (appError?.details.parameters) {
        alertMessage += `\nParameters: ${JSON.stringify(appError?.details.parameters, null, 2)}`
      }

      if (appError?.details.table) {
        alertMessage += `\nTable: ${appError?.details.table}`
      }

      if (appError?.details.fields) {
        alertMessage += `\nFields: ${appError?.details.fields.join(', ')}`
      }

      if (appError?.details.value !== undefined) {
        alertMessage += `\nValue: ${appError?.details.value}`
      }

      if (appError?.details.index) {
        alertMessage += `\nIndex: ${appError?.details.index}`
      }

      if (appError?.details.reltype) {
        alertMessage += `\nRelation Type: ${appError?.details.reltype}`
      }
    }

    alert(alertMessage)
  }

  // Componente que define o conteúdo adicional para o Alert
  const ExampleAdditionalContent = () => {
    return (
      <div className="flex justify-between items-center">
        {/* Exibe mensagem específica se houver erro de constraint de chave estrangeira */}
        <div className="text-md font-semibold">
          {appError?.details?.name == 'SequelizeForeignKeyConstraintError'
            ? 'Não é possível remover o item, pois há dados associados.'
            : ''}
        </div>

        {/* Botão para exibir detalhes completos do erro */}
        {appError?.details?.name && (
          <div className="flex">
            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
              onClick={showAlert}
            >
              <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
              Detalhes
            </button>
          </div>
        )}
      </div>
    )
  }

  // Retorna o componente Alert apenas se houver um erro para exibir
  return (
    appError && (
      <Alert
        additionalContent={<ExampleAdditionalContent />} // Conteúdo adicional com botão de detalhes
        color="failure" // Cor do alerta para indicar falha
        icon={HiInformationCircle} // Ícone para o alerta de informações
        onDismiss={onClose} // Função para fechar o alerta
      >
        {/* Mensagem principal do alerta */}
        <span className="font-medium">{appError?.message}!</span>
      </Alert>
    )
  )
}

export default AlertError
