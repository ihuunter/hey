import { useEnableSignlessMutation } from "@hey/indexer";
import type { ApolloClientError } from "@hey/types/errors";
import { useState } from "react";
import { toast } from "sonner";
import { Button, H6 } from "@/components/Shared/UI";
import errorToast from "@/helpers/errorToast";
import useTransactionLifecycle from "@/hooks/useTransactionLifecycle";

const Signless = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleTransactionLifecycle = useTransactionLifecycle();

  const onCompleted = () => {
    setIsSubmitting(false);
    toast.success("Signless enabled");
  };

  const onError = (error: ApolloClientError) => {
    setIsSubmitting(false);
    errorToast(error);
  };

  const [enableSignless] = useEnableSignlessMutation({
    onCompleted: async ({ enableSignless }) => {
      return await handleTransactionLifecycle({
        onCompleted,
        onError,
        transactionData: enableSignless
      });
    },
    onError
  });

  const handleToggleSignless = async () => {
    setIsSubmitting(true);

    return await enableSignless();
  };

  return (
    <div className="m-5 flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1.5">
        <b>Enable signless transactions</b>
        <H6 className="font-normal text-gray-500 dark:text-gray-200">
          You can enable Signless to interact with Hey without signing any of
          your transactions.
        </H6>
      </div>
      <Button
        className="mr-auto"
        disabled={isSubmitting}
        loading={isSubmitting}
        onClick={handleToggleSignless}
        variant="primary"
      >
        Enable
      </Button>
    </div>
  );
};

export default Signless;
