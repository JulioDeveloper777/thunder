import { SecretGenerator } from "../../../infra";
import RecoveryPassword from "./RecoveryPassword";
import RecoveryPasswordController from "./RecoveryPasswordController";
import { RecoveryPasswordDTO } from "./RecoveryPasswordDTO";
import { makeRecoveryRepository, makeUserRepository, transaction } from "../../../infra/database/repositories";

const makeRecoveryPasswordController = () => {
  const secretGenerator = new SecretGenerator({
    length: 150,
    numbers: true,
    uppercase: true,
    symbols: false,
  });

  const recoverypassword = new RecoveryPassword(
    makeUserRepository(),
    secretGenerator,
    transaction,
    makeRecoveryRepository(),
  );
  const RecoveryPasswordControllerClass = new RecoveryPasswordController(recoverypassword);
  return RecoveryPasswordControllerClass.handle.bind(RecoveryPasswordControllerClass);
};

export { makeRecoveryPasswordController, RecoveryPasswordDTO };

