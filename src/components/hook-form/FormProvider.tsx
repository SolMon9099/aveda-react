import { ReactNode } from 'react';
// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  sx?:any,
};

export default function FormProvider({ children, onSubmit, methods,sx }: Props) {
  return (
    sx ? (
      <Form {...methods}>
      <form style={{width:'100%'}} onSubmit={onSubmit}>{children}</form>
    </Form>
    ):
    (<Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>)
  );
}
