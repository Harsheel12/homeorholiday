package com.homeorholiday.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;

@Configuration
public class GraphQLConfig {

    @Bean
    public DataFetcherExceptionResolverAdapter exceptionResolver() {
        return new DataFetcherExceptionResolverAdapter() {
            @Override
            protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
                // Handle your custom exceptions
                if (ex instanceof RuntimeException && ex.getMessage().contains("Email already registered")) {
                    return GraphqlErrorBuilder.newError()
                            .message(ex.getMessage())
                            .path(env.getExecutionStepInfo().getPath())
                            .location(env.getField().getSourceLocation())
                            .errorType(ErrorType.BAD_REQUEST)
                            .build();
                }

                // Let default handling take over for other exceptions
                return null;
            }
        };
    }
}
