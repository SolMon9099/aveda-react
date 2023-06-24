import { useEffect, useMemo, useState } from "react"
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { processActivitySchema } from "src/@types/process";
import moment from "moment";
import { useDispatch, useSelector } from "src/redux/store";
import { createOrUpdateActivity } from "src/redux/slices/caseDetail";
import { useSnackbar } from "notistack";


const useActivitiesList = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { activities } = useSelector((state) => state.caseDetail)
    const [ selectedIds, setSelectedIds ] = useState<any[]>([])
    const [ openModal, setOpenModal ] = useState(false)
    const [ activityToEdit, setActivityToEdit ] = useState<any>(null);
    const [ HOUR_OPTIONS, setHOUR_OPTIONS ] = useState<any>([])
    const TABLEHEADER = [
      {id: 'name', subId: 'description', tagsId: 'tags', label: 'Atividade'},
      {id: 'processOrCase', label: 'Processo/Caso'},
      {id: 'type', type: 'hasIcon', label: 'Tipo'},
      {id: 'status', type: 'label', label: 'Status'},
      {id: 'responsible', label: 'Responsável'},
      {id: 'date', label: 'Prazo'},
    ]
    const RESPONSIBLE_OPTIONS = [
      {value: '1', label: 'Responsável 1'},
      {value: '2', label: 'Responsável 2'},
    ]
    const STATUS_OPTIONS = [
      {value: 'toDo', label: 'A Fazer'},
      {value: 'onDoing', label: 'Fazendo'},
      {value: 'finished', label: 'Concluído'},
    ]
    const TAGS_OPTIONS = [
      {value: '1', label: 'Teste 1', color: 'error'},
      {value: '2', label: 'Teste 2', color: 'success'}
    ]
    const VISIBILITY_OPTIONS = [
      {value: 'private', label: 'Privado'},
      {value: 'public', label: 'Público'},
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

    var defaultValues = useMemo(() =>(
      {
        name: activityToEdit?.name || '',
        description: activityToEdit?.description || '',
        type: activityToEdit?.type || 'task',
        responsible: activityToEdit?.responsible || [],
        tags: activityToEdit?.tags || [],
        status: activityToEdit?.status || 'toDo',
        date: activityToEdit?.date || moment().format('YYYY-MM-DD'),
        hour: activityToEdit?.hour || '',
        visibility: activityToEdit?.visibility || 'public'
      }
    ),[activityToEdit]) 

  const NewActivitySchema = Yup.object().shape({
      name: Yup.string().required('Campo obrigatório!'),
      description: Yup.string().required('Campo obrigatório!'),
      type: Yup.string(),
      responsible: Yup.array().min(1,'Campo obrigatório!'),
      tags: Yup.array(),
      date: Yup.string(),
      hour: Yup.string(),
      visibility: Yup.string()
  });

  const methods = useForm<processActivitySchema>({
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

  const onSubmit = async (data: processActivitySchema) =>{
    try{
      data.tags = data.tags.map((t: any) => t.value)
      data.responsible = data.responsible.map((r: any) => r.value)
      if(activityToEdit){
        data._id = activityToEdit._id
        await dispatch(createOrUpdateActivity(data))
        enqueueSnackbar('Atividade atualizada com sucesso')
      }else{
        await dispatch(createOrUpdateActivity(data))
        enqueueSnackbar('Atividade cadastrada com sucesso')
      }
      setOpenModal(false)
      setActivityToEdit(null)
    }catch(e){
      console.log(e)
    }
  }

  const onClose = () =>{
    setOpenModal(false)
    setActivityToEdit(null)
    reset()
  }

  const onSelectRow = (id: string) => {    
      const selectedIndex = selectedIds.indexOf(id);
  
      let newSelected: string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedIds, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedIds.slice(1));
      } else if (selectedIndex === selectedIds.length - 1) {
        newSelected = newSelected.concat(selectedIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedIds.slice(0, selectedIndex),
          selectedIds.slice(selectedIndex + 1)
        );
      }
      setSelectedIds(newSelected);
  };

  const onClickActivity = (id: string) => {
    setActivityToEdit(activities.find((act) => act._id === id))
    setOpenModal(true)
  }

  useEffect(() =>{
    if(activityToEdit && defaultValues){
      reset(defaultValues)
    }else if(defaultValues){
      reset(defaultValues)
    }
  },[activityToEdit, defaultValues, reset])

  const activitiesListHook: any = {
      TABLEHEADER,
      selectedIds,
      openModal,
      isSubmitting,
      values,
      RESPONSIBLE_OPTIONS,
      HOUR_OPTIONS,
      STATUS_OPTIONS,
      TAGS_OPTIONS,
      VISIBILITY_OPTIONS,
      methods,
      onClickActivity,
      onSubmit,
      onClose,
      setValue,
      handleSubmit,
      setOpenModal,
      onSelectRow
  }

  return{
      activitiesListHook
  }
}

export default useActivitiesList;