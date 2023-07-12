import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { processMovimenation } from "src/@types/process";
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERP } from 'src/routes/paths';
import { useCallback } from 'react';
import moment from 'moment';
import { useDispatch } from 'src/redux/store';
import { createMovimentation } from 'src/redux/slices/processMovimentation';
import { useSnackbar } from 'notistack';


const useProcessMovimentation = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { processMovimentationId } = useParams()
  const navigate = useNavigate()
  const TYPE_OPTIONS = [
    {value: 'Publicação', label: 'Publicação'},
    {value: 'Andamento', label: 'Andamento'},
    {value: 'Documento', label: 'Documento'},
  ]

  var defaultValues = {
    type: 'Publicação',
    documents: [],
    description: '',
    date: moment().format('YYYY-MM-DD')
  };

  const NewMovimentationSchema = Yup.object().shape({
      type: Yup.string().required('Campo obrigatório!'),
      documents: Yup.mixed().test('required', 'Adicione o Arquivo!', 
        (value) => {
          if(values.type === 'Documento' && value.length === 0){
            return false
          }
          return true   
        }
      ),
      description: Yup.string().test('required', 'Campo obrigatório!', 
        (value) => {
          if(values.type !== 'Documento' && (!value || value === '')){
            return false
          }
          return true   
        }
      ),
      date: Yup.string().required('Campo obrigatório!'),
  });

  const methods = useForm<processMovimenation>({
      resolver: yupResolver(NewMovimentationSchema),
      defaultValues,
  });

  const {
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  const values = watch()

  const onSubmit = async (data: processMovimenation) =>{
    try{
      await dispatch(createMovimentation(data))
      navigate(PATH_ERP.process+'/'+processMovimentationId)
      enqueueSnackbar('Movimentação cadastrada com sucesso')
    }catch(e){
      console.log(e)
    }
  }

  const onCancel = () => {
    reset()
    navigate(PATH_ERP.process + '/' + processMovimentationId)
  }

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      if(acceptedFiles.length === 0){
        setValue('documents', [])
      }else{
        acceptedFiles.forEach((file: any) =>{
          values.documents.push(file)
        })
  
        if (acceptedFiles) {
          setValue(
            'documents',
            values.documents
          );
        }
      }
    },
    [setValue, values.documents]
  );

  const onRemoveFile = (idx: string) =>{
    var aux = [...values.documents];
    aux.splice(parseInt(idx), 1)
    setValue('documents', aux)
  }

  const processMovimentationHook: any = {
      isSubmitting,
      values,
      methods,
      TYPE_OPTIONS,
      onSubmit,
      onCancel,
      onRemoveFile,
      handleSubmit,
      handleDrop
  }

  return{
      processMovimentationHook
  }
}

export default useProcessMovimentation;