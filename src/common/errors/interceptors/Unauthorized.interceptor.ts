import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { UnauthorizedError } from "../types/UnauthorizedError";

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        catchError((err: any) => {
          if (err instanceof UnauthorizedError) {
            throw new UnauthorizedException(err.message);
          } else {
            throw err;
          }
        })
      );
  }
}
