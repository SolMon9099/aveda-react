import { useEffect, useState } from "react"
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { processServiceSchema } from "src/@types/process";
import moment from "moment";
import { useDispatch } from "src/redux/store";
import { createService } from "src/redux/slices/processDetail";
import { useParams } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { useSnackbar } from "notistack";


const useServiceList = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { processId } = useParams()
    const [ openForm, setOpenForm ] = useState(false)
    const [ openList, setOpenList ] = useState(true)
    const [ HOUR_OPTIONS, setHOUR_OPTIONS ] = useState<any>([])
    const TYPE_OPTIONS = [
      {value: 'service', label: 'Atendimento'},
      {value: 'email', label: 'Email'},
      {value: 'calling', label: 'Ligação'},
    ]

    useEffect(() =>{
      var aux = [{value: '', label: ''}];

      [...Array(24)].map((_,idx) =>{
        if(idx < 10){
          aux.push({value: '0'+idx+':00', label: '0'+idx+':00'})
          aux.push({value: '0'+idx+':30', label: '0'+idx+':30'})
        }else{
          aux.push({value: idx+':00', label: idx+':00'})
          aux.push({value: idx+':30', label: idx+':30'})    
        }
        return true
      })
      setHOUR_OPTIONS(aux)
    },[])

    Array(24).map((_,idx) =>{
      if(idx < 10){
        HOUR_OPTIONS.push({value: '0'+idx+':00', label: '0'+idx+':00'})
        HOUR_OPTIONS.push({value: '0'+idx+':30', label: '0'+idx+':30'})
      }else{
        HOUR_OPTIONS.push({value: idx+':00', label: idx+':00'})
        HOUR_OPTIONS.push({value: idx+':30', label: idx+':30'})    
      }
      return true
    })

    var defaultValues = {
        type: 'service',
        description: '',
        date: moment().format('YYYY-MM-DD'),
        hour: '',
    }

  const NewActivitySchema = Yup.object().shape({
      type: Yup.string(),
      description: Yup.string().required('Campo obrigatório!'),
      date: Yup.string(),
      hour: Yup.string(),
  });

  const methods = useForm<processServiceSchema>({
      resolver: yupResolver(NewActivitySchema),
      defaultValues,
  });
  
  const {
      watch,
      setValue,
      handleSubmit,
      reset,
      formState: { isSubmitting }
  } = methods;

  const values = watch()

  const onSubmit = async (data: processServiceSchema) =>{
    try{
      if(processId){
        data.process = processId;
        data.responsible = user?._id
        await dispatch(createService(data))
        enqueueSnackbar('Atendimento criado com sucesso')
      }
      setOpenForm(false)
    }catch(e){
      console.log(e)
    }
  }

  const onClose = () =>{
    setOpenForm(false)
    reset()
  }

  const onClickNewCall = () => {
    setOpenForm(true)
    setOpenList(false)
  }

  const onClickCall = () => {
    setOpenForm(false)
    setOpenList(false)
  }

  const serviceListHook: any = {
      openForm,
      openList,
      isSubmitting,
      values,
      TYPE_OPTIONS,
      HOUR_OPTIONS,
      methods,
      onSubmit,
      onClose,
      setValue,
      handleSubmit,
      setOpenForm,
      setOpenList,
      onClickNewCall,
      onClickCall
  }

  return{
      serviceListHook
  }
}

export default useServiceList;