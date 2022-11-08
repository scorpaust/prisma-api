import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { DatabaseError } from "../types/DatabaseError";
import { handleDatabaseErrors } from "../utils/handle-database-errors.util";
import { isPrismaError } from "../utils/is-prisma-error.util";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        catchError(err => {
          if (isPrismaError(err)) {
            err = handleDatabaseErrors(err);
          }
          if (err instanceof DatabaseError) {
            throw new BadRequestException(err.message);
          }
          else {
            throw err;
          }
        })
      );
  }
}
