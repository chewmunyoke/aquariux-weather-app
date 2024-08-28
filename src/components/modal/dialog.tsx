import Button from '@/components/button';

import Modal from './root';

export default function DialogModal({
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onCancel?(): void;
  onConfirm(): void;
  onClose(): void;
}>) {
  return (
    <Modal onClose={onClose}>
      <div className='flex flex-col gap-y-4'>
        {children}
        <div className='flex justify-end gap-x-4'>
          {cancelLabel && onCancel ? (
            <Button type='secondary' onClick={onCancel}>
              {cancelLabel}
            </Button>
          ) : null}
          <Button type='primary' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
