import { toast } from 'ngx-sonner';

export class MeasureRules {
  static validateType(type: string): void {
    const typeArray = ['weight', 'temperature', 'bpm', 'respiratory rate']

    if (!typeArray.includes(type)) {
      toast.error("L'action n'a pas pu aboutir" , {
        duration: 3000,
      })
      throw new Error('Type invalide');
    }
  }
}
