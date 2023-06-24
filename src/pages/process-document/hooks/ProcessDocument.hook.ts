import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { processDocumentSchema } from "src/@types/process";
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERP } from 'src/routes/paths';
import { useCallback } from 'react';
import { useDispatch } from 'src/redux/store';
import { createDocument } from 'src/redux/slices/processDocument';
import { useSnackbar } from 'notistack';


const useProcessDocument = () => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { processDocumentId, caseDocumentId } = useParams()
  const navigate = useNavigate()
  const CATEGORY_OPTIONS = [
    {value: '', label: ''},
    {value: '1', label: 'Categoria 1'},
    {value: '2', label: 'Categoria 2'},
  ]

  var defaultValues = {
    url: '',
    category: '',
    description: '',
  };

  const NewDocumentSchema = Yup.object().shape({
      url: Yup.mixed().test('required', 'Adicione o Arquivo!', (value) => value !== ''),
      category: Yup.string().required('Adicione a Categoria!'),
      description: Yup.string(),
  });

  const methods = useForm<processDocumentSchema>({
      resolver: yupResolver(NewDocumentSchema),
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

  const onSubmit = async (data: processDocumentSchema) =>{
    try{
      if(caseDocumentId){
        data.process = caseDocumentId
        await dispatch(createDocument(data))
        navigate(PATH_ERP.case+'/'+caseDocumentId)
      }else if(processDocumentId){
        data.process = processDocumentId
        await dispatch(createDocument(data))
        navigate(PATH_ERP.process+'/'+processDocumentId)
      }
      enqueueSnackbar('Documento cadatrado com sucesso')
    }catch(e){
      console.log(e)
    }
  }

  const onCancel = () => {
    reset()
    if(caseDocumentId){
      navigate(PATH_ERP.case+'/'+caseDocumentId)
    }else{
      navigate(PATH_ERP.process+'/'+processDocumentId)
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      console.log(acceptedFiles)
      if(acceptedFiles.length === 0){
        setValue('url', '')
      }else{
        const file = acceptedFiles[0];
  
        if (file) {
          setValue(
            'url',
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        }
      }
    },
    [setValue]
  );

  const processDocumentHook: any = {
      isSubmitting,
      values,
      methods,
      CATEGORY_OPTIONS,
      onSubmit,
      onCancel,
      handleSubmit,
      handleDrop
  }

  return{
      processDocumentHook
  }
}

export default useProcessDocument;