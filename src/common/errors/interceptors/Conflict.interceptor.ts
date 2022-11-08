import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { ConflictError } from "../types/ConflictError";
import { isPrismaError } from "../utils/is-prisma-error.util";

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        catchError(err => {
          if (err instanceof ConflictError) {
            throw new ConflictException(err.message);
          }
          else
          {
            throw err;
          }
        })
      );
  }
}
